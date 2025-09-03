// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Wifi, QrCode, Loader2 } from 'lucide-react';

export default function QrGenerator(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const generateWifiQr = () => {
    if (!wifiInfo.ssid) {
      toast({
        title: '错误',
        description: '请输入网络名称',
        variant: 'destructive'
      });
      return;
    }
    setIsGenerating(true);

    // 模拟生成过程
    setTimeout(() => {
      setIsGenerating(false);
      const wifiConfig = `WIFI:T:${wifiInfo.encryption};S:${wifiInfo.ssid};P:${wifiInfo.password};`;

      // 跳转到展示页面
      $w.utils.navigateTo({
        pageId: 'combined',
        params: {
          type: 'WiFi',
          content: wifiConfig
        }
      });
    }, 1500);
  };
  const generateOtherQr = () => {
    setIsGenerating(true);

    // 模拟生成过程
    setTimeout(() => {
      setIsGenerating(false);

      // 跳转到展示页面
      $w.utils.navigateTo({
        pageId: 'combined',
        params: {
          type: '网址链接',
          content: 'https://example.com'
        }
      });
    }, 1500);
  };
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setWifiInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-8">二维码生成器</h1>

      {/* 功能按钮区 */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="text-center">
          <Button className="w-full" onClick={generateWifiQr} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wifi className="mr-2 h-4 w-4" />}
            WIFI信息
          </Button>
          <p className="text-sm text-gray-500 mt-1">生成WiFi连接二维码</p>
        </div>

        <div className="text-center">
          <Button className="w-full" variant="outline" onClick={generateOtherQr} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <QrCode className="mr-2 h-4 w-4" />}
            收款码/网址码
          </Button>
          <p className="text-sm text-gray-500 mt-1">生成其他类型二维码</p>
        </div>
      </div>

      {/* WiFi信息输入区域 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">WiFi信息</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ssid">WiFi名称</Label>
            <Input id="ssid" name="ssid" value={wifiInfo.ssid} onChange={handleInputChange} placeholder="输入WiFi名称" />
          </div>
          <div>
            <Label htmlFor="password">密码</Label>
            <Input id="password" name="password" type="password" value={wifiInfo.password} onChange={handleInputChange} placeholder="输入密码" />
          </div>
          <div>
            <Label htmlFor="encryption">加密类型</Label>
            <Select value={wifiInfo.encryption} onValueChange={value => setWifiInfo({
            ...wifiInfo,
            encryption: value
          })}>
              <SelectTrigger>
                <SelectValue placeholder="选择加密类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="none">无加密</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>;
}