// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, useToast } from '@/components/ui';

export default function QRGenerator(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [qrImage, setQrImage] = useState(null);
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  const [generatedQR, setGeneratedQR] = useState(null);
  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setQrImage(URL.createObjectURL(file));
    }
  };
  const handleGenerateQR = () => {
    if (activeTab === 'upload' && !qrImage) {
      toast({
        title: '请上传二维码图片',
        variant: 'destructive'
      });
      return;
    }
    if (activeTab === 'wifi' && !wifiInfo.ssid) {
      toast({
        title: '请输入WiFi名称',
        variant: 'destructive'
      });
      return;
    }

    // 模拟生成二维码
    const mockQR = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + (activeTab === 'upload' ? 'https://example.com' : `WIFI:S:${wifiInfo.ssid};T:${wifiInfo.encryption};P:${wifiInfo.password};;`);
    setGeneratedQR(mockQR);
  };
  const handleNavigateToAdPage = () => {
    $w.utils.navigateTo({
      pageId: 'ad-page',
      params: {
        qrData: generatedQR
      }
    });
  };
  return <div className="container mx-auto px-4 py-8 max-w-md">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">带广告的二维码生成器</h1>
      </header>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex border-b mb-6">
          <button className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`} onClick={() => setActiveTab('upload')}>
            上传现有二维码
          </button>
          <button className={`px-4 py-2 ${activeTab === 'wifi' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`} onClick={() => setActiveTab('wifi')}>
            输入WiFi信息
          </button>
        </div>

        {activeTab === 'upload' && <div className="mb-4">
            <label className="block text-sm font-medium mb-2">上传二维码图片</label>
            <p className="text-xs text-gray-500 mb-2">支持 WiFi 码 / 收款码 / 网址码</p>
            <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100" />
            {qrImage && <img src={qrImage} alt="上传的二维码" className="mt-4 mx-auto max-h-40" />}
          </div>}

        {activeTab === 'wifi' && <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">WiFi名称</label>
              <p className="text-xs text-gray-500 mb-2">需填写WiFi名称和密码</p>
              <Input value={wifiInfo.ssid} onChange={e => setWifiInfo({
            ...wifiInfo,
            ssid: e.target.value
          })} placeholder="输入WiFi名称" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">WiFi密码</label>
              <Input type="password" value={wifiInfo.password} onChange={e => setWifiInfo({
            ...wifiInfo,
            password: e.target.value
          })} placeholder="输入WiFi密码" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">加密类型</label>
              <select value={wifiInfo.encryption} onChange={e => setWifiInfo({
            ...wifiInfo,
            encryption: e.target.value
          })} className="w-full p-2 border rounded-md">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="none">无加密</option>
              </select>
            </div>
          </div>}

        <Button className="w-full mt-4" onClick={handleGenerateQR}>
          生成新二维码
        </Button>
      </div>

      {generatedQR && <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <img src={generatedQR} alt="生成的二维码" className="mx-auto" />
            <p className="text-sm mt-2">扫码后将显示广告和原功能</p>
            <Button className="mt-4 w-full" onClick={handleNavigateToAdPage}>
              查看广告效果
            </Button>
          </div>
        </div>}
    </div>;
}