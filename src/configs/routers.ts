import QR_GENERATOR from '../pages/qr-generator.jsx';
import COMBINED from '../pages/combined.jsx';
import INDEX from '../pages/index.jsx';
import WIFI_INPUT from '../pages/wifi-input.jsx';
import UPLOAD_ORIGINAL from '../pages/upload-original.jsx';
import QRCODE_RESULT from '../pages/qrcode-result.jsx';
export const routers = [{
  id: "qr-generator",
  component: QR_GENERATOR
}, {
  id: "combined",
  component: COMBINED
}, {
  id: "index",
  component: INDEX
}, {
  id: "wifi-input",
  component: WIFI_INPUT
}, {
  id: "upload-original",
  component: UPLOAD_ORIGINAL
}, {
  id: "qrcode-result",
  component: QRCODE_RESULT
}]