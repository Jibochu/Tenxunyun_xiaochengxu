// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function AdPage(props) {
  const {
    $w
  } = props;
  const {
    params
  } = $w.page.dataset;
  const qrData = params?.qrData;
  return <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 广告区域 */}
        <div className="bg-gray-200 p-4 rounded-lg md:w-1/3">
          <h3 className="font-bold mb-2">广告</h3>
          <div className="bg-white p-4 rounded">
            <p>这里是广告内容</p>
          </div>
        </div>

        {/* 原功能区域 */}
        <div className="bg-white p-6 rounded-lg shadow-md md:w-2/3">
          {qrData?.includes('WIFI:') ? <div>
              <h2 className="text-xl font-bold mb-4">WiFi连接信息</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">WiFi名称</label>
                  <p className="mt-1">{qrData.match(/S:([^;]+)/)?.[1]}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">密码</label>
                  <p className="mt-1">{qrData.match(/P:([^;]+)/)?.[1] || '无密码'}</p>
                </div>
                <Button className="w-full">
                  一键连接WiFi
                </Button>
              </div>
            </div> : <div className="text-center">
              <h2 className="text-xl font-bold mb-4">扫码结果</h2>
              <p>这里是原始二维码的功能</p>
            </div>}
        </div>
      </div>
    </div>;
}