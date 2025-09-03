// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Download, Check, Wifi, Image as ImageIcon } from 'lucide-react';

export default function QrcodeResultPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [qrType, setQrType] = useState('wifi');
  const [qrContent, setQrContent] = useState('');
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA/WPA2'
  });
  const [isSaved, setIsSaved] = useState(false);
  const [imageId, setImageId] = useState('');
  useEffect(() => {
    // 从URL参数获取数据
    const params = $w.page.dataset.params;
    const type = params?.type || 'wifi';
    setQrType(type);
    if (type === 'wifi') {
      setWifiInfo({
        ssid: params?.ssid || 'MyWiFi',
        password: params?.password || '',
        encryption: params?.encryption || 'WPA/WPA2'
      });
      setQrContent(`WIFI:T:${params?.encryption || 'WPA/WPA2'};S:${params?.ssid || 'MyWiFi'};P:${params?.password || ''};;`);
    } else if (type === 'upload') {
      setImageId(params?.imageId || '');
      setQrContent(`https://example.com/images/${params?.imageId || ''}`);
    }
  }, [$w.page.dataset.params]);
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleSave = () => {
    setIsSaved(true);
    toast({
      title: '保存成功',
      description: '二维码已保存到相册'
    });

    // 模拟下载过程
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };
  const getQrImageUrl = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrContent)}`;
  };
  return <div className="container mx-auto px-4 py-8 max-w-md">
      {/* 头部导航 */}
      <div className="flex items-center mb-8">
        <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </button>
      </div>

      {/* 二维码卡片 */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-center mb-6">
          <img src={getQrImageUrl()} alt="生成的二维码" className="w-64 h-64 border border-gray-200 rounded-lg" />
        </div>

        {/* 动态显示不同类型的信息 */}
        {qrType === 'wifi' && <div className="space-y-3">
            <h2 className="text-lg font-semibold">WiFi连接信息</h2>
            <div className="space-y-2">
              <p><span className="font-medium">网络名称:</span> {wifiInfo.ssid}</p>
              <p><span className="font-medium">密码:</span> {wifiInfo.password || '无密码'}</p>
              <p><span className="font-medium">加密类型:</span> {wifiInfo.encryption}</p>
            </div>
          </div>}

        {qrType === 'upload' && <div className="space-y-3">
            <h2 className="text-lg font-semibold">图片二维码</h2>
            <p>扫描此二维码可查看上传的图片</p>
          </div>}
      </div>

      {/* 保存按钮 */}
      <Button className="w-full" onClick={handleSave} disabled={isSaved}>
        {isSaved ? <>
            <Check className="mr-2 h-4 w-4" />
            已保存
          </> : <>
            <Download className="mr-2 h-4 w-4" />
            保存二维码
          </>}
      </Button>
    </div>;
}