// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, QrCode, Image, RotateCw, Loader2 } from 'lucide-react';

export default function UploadOriginalPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleFileSelect = e => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };
  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };
  const processFile = file => {
    if (!file.type.match('image.*')) {
      toast({
        title: '错误',
        description: '请上传图片文件',
        variant: 'destructive'
      });
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleGenerate = () => {
    if (!selectedFile) return;
    setIsGenerating(true);

    // 模拟生成过程
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: '生成成功',
        description: '新二维码已生成'
      });

      // 跳转到结果页
      $w.utils.navigateTo({
        pageId: 'qrcode-result',
        params: {
          type: 'upload',
          content: '从上传的二维码生成的内容'
        }
      });
    }, 1500);
  };
  return <div className="container mx-auto px-4 py-6 max-w-md">
      {/* 头部导航 */}
      <header className="flex items-center mb-6">
        <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>返回</span>
        </button>
      </header>

      {/* 上传区域 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onClick={() => fileInputRef.current?.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          {!previewUrl ? <div className="flex flex-col items-center">
              <Image className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-500 mb-2">点击或拖拽上传二维码图片</p>
              <p className="text-sm text-gray-400">支持 JPG, PNG 格式</p>
            </div> : <div className="flex flex-col items-center">
              <img src={previewUrl} alt="预览图" className="max-h-64 mx-auto mb-4 rounded" />
              <button onClick={e => {
            e.stopPropagation();
            resetUpload();
          }} className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                <RotateCw className="h-4 w-4 mr-1" />
                重新上传
              </button>
            </div>}
        </div>
        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileSelect} />
      </div>

      {/* 生成按钮 */}
      <Button className="w-full" onClick={handleGenerate} disabled={!selectedFile || isGenerating}>
        {isGenerating ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            生成中...
          </> : <>
            <QrCode className="mr-2 h-4 w-4" />
            生成新二维码
          </>}
      </Button>
    </div>;
}