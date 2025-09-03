// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { Wifi, QrCode } from 'lucide-react';

export default function CombinedPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('wifi');
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: '',
    showPassword: false
  });
  const [qrContent, setQrContent] = useState('');
  const handleConnectWifi = () => {
    if (!wifiInfo.ssid) {
      toast({
        title: '请输入WiFi名称',
        variant: 'destructive'
      });
      return;
    }
    // 模拟连接WiFi
    toast({
      title: '连接成功',
      description: `已连接到 ${wifiInfo.ssid}`
    });
  };
  const handleGenerateQR = () => {
    if (!qrContent) {
      toast({
        title: '请输入要生成二维码的内容',
        variant: 'destructive'
      });
      return;
    }
    // 模拟生成二维码
    toast({
      title: '二维码已生成',
      description: '长按可保存二维码'
    });
  };
  return <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-4">
        {/* 广告区 (30%) */}
        <div className="w-full md:w-3/10 bg-gray-200 p-4 rounded-lg">
          <div className="text-xs text-gray-500 mb-2">广告</div>
          <div className="bg-white p-3 rounded shadow">
            <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500" alt="广告" className="w-full rounded" />
            <h3 className="text-sm font-semibold mt-2">优质WiFi设备推荐</h3>
            <p className="text-xs text-gray-600">高性能路由器限时特惠</p>
          </div>
        </div>

        {/* 原功能区 (70%) */}
        <div className="w-full md:w-7/10 bg-white p-4 rounded-lg shadow">
          <div className="flex border-b mb-4">
            <button className={`px-4 py-2 font-medium ${activeTab === 'wifi' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('wifi')}>
              WiFi连接
            </button>
            <button className={`px-4 py-2 font-medium ${activeTab === 'qr' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('qr')}>
              二维码功能
            </button>
          </div>

          {/* WiFi连接内容 */}
          {activeTab === 'wifi' && <div className="space-y-4">
              <div className="text-center mb-6">
                <Wifi className="mx-auto h-10 w-10 text-blue-500 animate-pulse" />
                <h2 className="text-xl font-bold mt-2">WiFi连接</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">WiFi名称</label>
                <Input value={wifiInfo.ssid} onChange={e => setWifiInfo({
              ...wifiInfo,
              ssid: e.target.value
            })} placeholder="输入WiFi名称" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">密码</label>
                <Input type={wifiInfo.showPassword ? 'text' : 'password'} value={wifiInfo.password} onChange={e => setWifiInfo({
              ...wifiInfo,
              password: e.target.value
            })} placeholder="输入密码" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="show-password" checked={wifiInfo.showPassword} onChange={() => setWifiInfo({
              ...wifiInfo,
              showPassword: !wifiInfo.showPassword
            })} className="mr-2" />
                <label htmlFor="show-password" className="text-sm text-gray-600">
                  显示密码
                </label>
              </div>
              <Button className="w-full" onClick={handleConnectWifi}>
                连接
              </Button>
            </div>}

          {/* 二维码功能内容 */}
          {activeTab === 'qr' && <div className="space-y-4">
              <div className="text-center mb-6">
                <QrCode className="mx-auto h-10 w-10 text-green-500" />
                <h2 className="text-xl font-bold mt-2">二维码功能</h2>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-500">扫描二维码区域</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">生成二维码内容</label>
                <Input value={qrContent} onChange={e => setQrContent(e.target.value)} placeholder="输入要生成二维码的内容" />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  扫描
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleGenerateQR}>
                  生成
                </Button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
}