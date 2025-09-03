// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Download, QrCode, Upload } from 'lucide-react';

export default function QrGenerator(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedContent, setParsedContent] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.match('image.*')) {
      toast({
        title: '错误',
        description: '请上传图片文件',
        variant: 'destructive'
      });
      return;
    }
    setFile(selectedFile);
    parseQrCode(selectedFile);
  };
  const parseQrCode = file => {
    setIsParsing(true);
    // 模拟解析过程
    setTimeout(() => {
      setIsParsing(false);
      setParsedContent(`二维码内容示例:\n文件名: ${file.name}\n大小: ${(file.size / 1024).toFixed(2)}KB\n类型: ${file.type}`);

      // 如果是WiFi信息，自动填充表单
      if (file.name.includes('wifi')) {
        setWifiInfo({
          ssid: 'MyWiFi',
          password: 'mypassword',
          encryption: 'WPA'
        });
      }
    }, 1500);
  };
  const generateWifiQr = () => {
    if (!wifiInfo.ssid) {
      toast({
        title: '错误',
        description: '请输入网络名称',
        variant: 'destructive'
      });
      return;
    }

    // 模拟生成二维码
    const wifiConfig = `WIFI:T:${wifiInfo.encryption};S:${wifiInfo.ssid};P:${wifiInfo.password};`;
    setQrCodeUrl(`data:image/svg+xml;utf8,<svg>模拟二维码:${wifiConfig}</svg>`);
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
      <h1 className="text-2xl font-bold text-center mb-8">带广告的二维码生成器</h1>

      {/* 功能按钮区 */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="text-center">
          <Button className="w-full" onClick={() => document.getElementById('fileInput').click()}>
            <Upload className="mr-2 h-4 w-4" />
            上传现有二维码图片
          </Button>
          <p className="text-sm text-gray-500 mt-1">支持 WiFi 码 / 收款码 / 网址码</p>
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <div className="text-center">
          <Button className="w-full" variant="outline" onClick={() => setWifiInfo({
          ...wifiInfo,
          ssid: '',
          password: ''
        })}>
            <QrCode className="mr-2 h-4 w-4" />
            手动输入 WiFi 信息生成
          </Button>
          <p className="text-sm text-gray-500 mt-1">需填写 WiFi 名称和密码</p>
        </div>
      </div>

      {/* 输入区域 - 上传图片 */}
      {file && <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">上传的二维码</h2>
          <div className="flex items-center justify-center p-4 border border-dashed rounded-lg">
            <img src={URL.createObjectURL(file)} alt="上传的二维码" className="max-h-40 max-w-full" />
          </div>
          {isParsing && <div className="mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse mr-2"></div>
                <span className="text-sm text-gray-600">正在解析二维码...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full w-full animate-pulse"></div>
              </div>
            </div>}
          {parsedContent && !isParsing && <div className="mt-4">
              <p className="text-sm font-medium mb-2">解析结果:</p>
              <div className="bg-gray-100 p-3 rounded-md text-sm break-words">
                {parsedContent}
              </div>
            </div>}
        </div>}

      {/* 输入区域 - WiFi信息 */}
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
          <Button className="w-full" onClick={generateWifiQr}>
            <QrCode className="mr-2 h-4 w-4" />
            生成新二维码
          </Button>
        </div>
      </div>

      {/* 结果展示区 */}
      {qrCodeUrl && <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">生成的二维码</h2>
          <div className="flex flex-col items-center">
            <img src={qrCodeUrl} alt="生成的WiFi二维码" className="w-48 h-48 mb-4 border border-gray-200" />
            <p className="text-sm text-gray-500 mb-4">扫码后将显示广告和原功能</p>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              保存二维码
            </Button>
          </div>
        </div>}
    </div>;
}