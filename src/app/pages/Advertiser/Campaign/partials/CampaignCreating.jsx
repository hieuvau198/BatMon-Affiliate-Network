import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, message, Input, Select, Switch, Button } from "antd";
import createCampaign from "../../../../modules/Campaign/createCampaign";

export default function CampaignCreating() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    advertiserId: 0, // Mặc định là 0 nếu không có giá trị
    name: "",
    description: "",
    budget: 0,
    dailyCap: 0,
    monthlyCap: 0,
    startDate: "",
    endDate: "",
    targetingCountries: "",
    targetingDevices: "",
    isPrivate: false,
    conversionRate: 0,
    currencyCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = (checked) => {
    setForm({ ...form, isPrivate: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.startDate || !form.endDate) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      await createCampaign(form);
      message.success("Chiến dịch đã được tạo thành công!");
      navigate("/advertiser/campaignList");
    } catch (error) {
      message.error("Tạo chiến dịch thất bại!");
    }
  };

  return (
    <div>
      <div className="shadow-sm rounded-lg bg-white p-6 max-w-[1200px] w-full">
        
        {/* Nút Quay lại */}
        <div className="flex items-center mb-4">
          <Button onClick={() => window.history.back()} className="mr-4">
            ⬅ Quay lại
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Tạo Chiến Dịch Mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <Card className="p-4">
            <label className="block font-semibold mb-1">Tên chiến dịch</label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </Card>

          <Card className="p-4">
            <label className="block font-semibold mb-1">Mô tả</label>
            <Input.TextArea name="description" value={form.description} onChange={handleChange} required />
          </Card>

          <div className="grid grid-cols-3 gap-6">
            <Card className="p-4">
              <label className="block font-semibold mb-1">Ngân sách (VNĐ)</label>
              <Input name="budget" type="number" value={form.budget} onChange={handleChange} required />
            </Card>
            <Card className="p-4">
              <label className="block font-semibold mb-1">Hạn mức ngày (VNĐ)</label>
              <Input name="dailyCap" type="number" value={form.dailyCap} onChange={handleChange} required />
            </Card>
            <Card className="p-4">
              <label className="block font-semibold mb-1">Hạn mức tháng (VNĐ)</label>
              <Input name="monthlyCap" type="number" value={form.monthlyCap} onChange={handleChange} required />
            </Card>
          </div>

          <Card className="p-4">
            <label className="block font-semibold mb-1">Thời gian chiến dịch</label>
            <div className="grid grid-cols-2 gap-4">
              <Input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
              <Input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <label className="block font-semibold mb-1">Quốc gia nhắm mục tiêu</label>
              <Input name="targetingCountries" value={form.targetingCountries} onChange={handleChange} required />
            </Card>
            <Card className="p-4">
              <label className="block font-semibold mb-1">Thiết bị nhắm mục tiêu</label>
              <Input name="targetingDevices" value={form.targetingDevices} onChange={handleChange} required />
            </Card>
          </div>

          <Card className="p-4">
            <label className="block font-semibold mb-1">Tỉ lệ chuyển đổi (%)</label>
            <Input name="conversionRate" type="number" step="0.1" value={form.conversionRate} onChange={handleChange} required />
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <label className="block font-semibold mb-1">Mã tiền tệ</label>
              <Input name="currencyCode" value={form.currencyCode} onChange={handleChange} required />
            </Card>
            <Card className="p-4">
              <label className="block font-semibold mb-1">Chiến dịch riêng tư</label>
              <Switch checked={form.isPrivate} onChange={handleSwitchChange} />
            </Card>
          </div>

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Tạo chiến dịch
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
