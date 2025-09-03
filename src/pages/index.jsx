// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Wifi, QrCode } from 'lucide-react';

export default function HomePage(props) {
  const {
    $w
  } = props;
  const navigateToWifi = () => {
    $w.utils.navigateTo({
      pageId: 'wifi-generator',
      params: {}
    });
  };
  const navigateToCustom = () => {
    $w.utils.navigateTo({
      pageId: 'custom-generator',
      params: {}
    });
  };
  return <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-8">二维码生成器</h1>

      <div className="flex flex-col space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Wifi className="text-blue-500" size={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">生成WiFi二维码</h2>
          <p className="text-gray-500 text-sm mb-4">快速分享您的WiFi网络</p>
          <Button className="w-full" onClick={navigateToWifi}>
            开始生成
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <QrCode className="text-purple-500" size={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">生成新的二维码</h2>
          <p className="text-gray-500 text-sm mb-4">自定义文本、链接等内容</p>
          <Button className="w-full" variant="outline" onClick={navigateToCustom}>
            开始生成
          </Button>
        </div>
      </div>
    </div>;
}