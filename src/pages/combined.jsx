// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Wifi, Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react';

export default function CombinedPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [qrType, setQrType] = useState('网址链接');
  const [qrContent, setQrContent] = useState('https://example.com/special-offer');

  // 从URL参数获取二维码信息
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || '网址链接';
    const content = params.get('content') || 'https://example.com/special-offer';
    setQrType(type);
    setQrContent(content);
  }, []);
  const handleConnectWifi = () => {
    setIsConnecting(true);

    // 模拟连接过程
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: '连接成功',
        description: '已成功连接到WiFi网络'
      });
    }, 2000);
  };
  const handleOpenContent = () => {
    if (qrType === '网址链接') {
      window.open(qrContent, '_blank');
    } else {
      toast({
        title: '内容展示',
        description: qrContent
      });
    }
  };
  return <div className="flex h-[90vh] bg-gray-100">
      {/* 左侧广告区 (30%) */}
      <div className="w-3/10 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="text-lg font-bold mb-2">赞助商广告</h3>
          <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format" alt="广告" className="w-full h-auto rounded" />
          <p className="text-sm text-gray-600 mt-2">立即下载我们的APP，享受更多优惠</p>
          <Button className="mt-2 w-full">
            了解更多
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-bold mb-2">推荐商品</h3>
          <div className="flex items-center mb-2">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format" alt="商品" className="w-16 h-16 rounded mr-2" />
            <div>
              <p className="font-medium">无线耳机</p>
              <p className="text-red-500">¥299</p>
            </div>
          </div>
          <Button className="mt-2 w-full bg-orange-500 hover:bg-orange-600">
            立即购买
          </Button>
        </div>
      </div>

      {/* 右侧功能区 (70%) */}
      <div className="w-7/10 p-6 overflow-y-auto">
        {/* WiFi连接卡片 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Wifi className="text-blue-500" size={20} />
            </div>
            <h2 className="text-xl font-bold">WiFi连接</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">网络名称</p>
              <p className="font-medium">公司公共WiFi</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">密码</p>
              <div className="flex items-center">
                <p className="font-medium">
                  {passwordVisible ? 'company123' : '•••••••••'}
                </p>
                <button className="ml-2 text-gray-400" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <Button className={`w-full mt-4 ${isConnected ? 'bg-green-500 hover:bg-green-600' : ''}`} onClick={handleConnectWifi} disabled={isConnecting || isConnected}>
              {isConnecting ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  连接中...
                </> : isConnected ? '已连接' : '一键连接WiFi'}
            </Button>
          </div>
        </div>

        {/* 二维码内容卡片 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Wifi className="text-green-500" size={20} />
            </div>
            <h2 className="text-xl font-bold">二维码内容</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">类型</p>
              <p className="font-medium">{qrType}</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">内容</p>
              <p className="font-medium break-all">{qrContent}</p>
            </div>
            
            <Button className="w-full mt-4 bg-green-500 hover:bg-green-600" onClick={handleOpenContent}>
              <ExternalLink className="mr-2 h-4 w-4" />
              {qrType === '网址链接' ? '打开链接' : '查看内容'}
            </Button>
          </div>
        </div>
      </div>
    </div>;
}