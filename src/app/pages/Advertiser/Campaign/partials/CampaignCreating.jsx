import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "E-commerce",
    budget: "",
    startDate: "",
    endDate: "",
    commissionType: "CPS",
    commissionRate: "",
    banners: [],
    rules: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/advertiser/campaignList");
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="shadow rounded-lg bg-white p-6 max-w-[1500px] w-full">
        {/* Breadcrumb & Nút Quay lại */}
        <div className="flex items-center mb-4">
          <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-4">
            ⬅ Quay lại
          </button>
          <span className="text-gray-500">Chiến dịch / Tạo mới</span>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Tạo Chiến Dịch Mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="p-4">
            <label className="block font-semibold mb-1">Tên chiến dịch</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <label className="block font-semibold mb-1">Danh mục</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="E-commerce">E-commerce</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Travel">Travel</option>
              </select>
            </Card>

            <Card className="p-4">
              <label className="block font-semibold mb-1">Ngân sách (VNĐ)</label>
              <input type="number" name="budget" value={form.budget} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            </Card>
          </div>

          <Card className="p-4">
            <label className="block font-semibold mb-1">Thời gian chiến dịch</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <label className="block font-semibold mb-1">Loại hoa hồng</label>
              <select name="commissionType" value={form.commissionType} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="CPC">CPC (Cost per Click)</option>
                <option value="CPA">CPA (Cost per Action)</option>
                <option value="CPS">CPS (Cost per Sale)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </Card>

            <Card className="p-4">
              <label className="block font-semibold mb-1">Mức hoa hồng (%)</label>
              <input type="number" name="commissionRate" value={form.commissionRate} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            </Card>
          </div>

          <Card className="p-4">
            <label className="block font-semibold mb-1">Banner quảng cáo</label>
            <input type="file" multiple accept="image/*" onChange={(e) => setForm({ ...form, banners: Array.from(e.target.files) })} className="w-full p-2 border rounded-lg" />
            {form.banners.length > 0 && (
              <p className="text-sm text-green-600 mt-2">{form.banners.length} file(s) đã chọn</p>
            )}
          </Card>

          <Card className="p-4">
            <label className="block font-semibold mb-1">Quy định chiến dịch</label>
            {form.rules.map((rule, index) => (
              <input key={index} type="text" value={rule} onChange={(e) => {
                const updatedRules = [...form.rules];
                updatedRules[index] = e.target.value;
                setForm({ ...form, rules: updatedRules });
              }} className="w-full p-2 border rounded-lg mb-2" />
            ))}
            <button type="button" onClick={() => setForm({ ...form, rules: [...form.rules, ""] })} className="px-4 py-2 bg-gray-200 rounded-lg">
              + Thêm quy định
            </button>
          </Card>

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Tạo chiến dịch
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
