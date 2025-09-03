// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function WifiInputPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const handleBack = () => {
    $w.utils.navigateBack();
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGenerate = () => {
    if (!wifiInfo.ssid.trim()) {
      toast({
        title: '错误',
        description: '请输入WiFi名称',
        variant: 'destructive'
      });
      return;
    }
    setIsGenerating(true);

    // 模拟生成过程
    setTimeout(() => {
      setIsGenerating(false);
      // 跳转到二维码展示页
      $w.utils.navigateTo({
        pageId: 'qrcode-result',
        params: {
          type: 'wifi',
          ssid: wifiInfo.ssid,
          password: wifiInfo.password
        }
      });
    }, 1500);
  };
  return <div className="container mx-auto px-4 py-8 max-w-md">
      {/* 返回按钮 */}
      <div className="mb-6">
        <button onClick={handleBack} className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>返回</span>
        </button>
      </div>

      {/* 表单区域 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">输入WiFi信息</h1>
        
        {/* WiFi名称输入 */}
        <div className="mb-6">
          <Label htmlFor="ssid" className="mb-2">WiFi名称</Label>
          <Input type="text" id="ssid" name="ssid" value={wifiInfo.ssid} onChange={handleInputChange} placeholder="请输入WiFi名称" className="w-full" />
        </div>

        {/* 密码输入 */}
        <div className="mb-8">
          <Label htmlFor="password" className="mb-2">密码</Label>
          <div className="relative">
            <Input type={showPassword ? 'text' : 'password'} id="password" name="password" value={wifiInfo.password} onChange={handleInputChange} placeholder="请输入密码" className="w-full pr-10" />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* 生成按钮 */}
        <Button onClick={handleGenerate} disabled={!wifiInfo.ssid.trim() || isGenerating} className="w-full">
          {isGenerating ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              生成中...
            </> : '生成二维码'}
        </Button>
      </div>
    </div>;
}