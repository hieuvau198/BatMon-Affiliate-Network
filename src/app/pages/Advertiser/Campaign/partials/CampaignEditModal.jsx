import { Modal, Input, Select } from "antd";

const EditCampaignModal = ({
  visible,
  campaign,
  onCancel,
  onSubmit,
  onChange,
  onStatusChange,
}) => {
  return (
    <Modal
      title="Chỉnh sửa chiến dịch"
      open={visible}
      onCancel={onCancel}
      onOk={onSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
      width={600}
    >
      <div className="space-y-4">
        {/* Existing fields */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tên chiến dịch
          </label>
          <Input
            name="name"
            placeholder="Tên chiến dịch"
            value={campaign?.name}
            onChange={onChange}
            className="w-full rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Mô tả
          </label>
          <Input.TextArea
            name="description"
            placeholder="Mô tả"
            value={campaign?.description}
            onChange={onChange}
            className="w-full rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Ngân sách
          </label>
          <Input
            name="budget"
            placeholder="Ngân sách"
            type="number"
            value={campaign?.budget}
            onChange={onChange}
            className="w-full rounded"
            addonAfter="VNĐ"
          />
        </div>

        {/* New additional fields */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Giới hạn ngày
            </label>
            <Input
              name="dailyCap"
              placeholder="Giới hạn ngân sách ngày"
              type="number"
              value={campaign?.dailyCap}
              onChange={onChange}
              className="w-full rounded"
              addonAfter="VNĐ"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Giới hạn tháng
            </label>
            <Input
              name="monthlyCap"
              placeholder="Giới hạn ngân sách tháng"
              type="number"
              value={campaign?.monthlyCap}
              onChange={onChange}
              className="w-full rounded"
              addonAfter="VNĐ"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Ngày bắt đầu
            </label>
            <Input
              name="startDate"
              placeholder="Ngày bắt đầu"
              type="date"
              value={campaign?.startDate}
              onChange={onChange}
              className="w-full rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Ngày kết thúc
            </label>
            <Input
              name="endDate"
              placeholder="Ngày kết thúc"
              type="date"
              value={campaign?.endDate}
              onChange={onChange}
              className="w-full rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Quốc gia mục tiêu
            </label>
            <Input
              name="targetingCountries"
              placeholder="VD: VN,US,NB"
              value={campaign?.targetingCountries}
              onChange={onChange}
              className="w-full rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Thiết bị mục tiêu
            </label>
            <Input
              name="targetingDevices"
              placeholder="Thiết bị"
              value={campaign?.targetingDevices}
              onChange={onChange}
              className="w-full rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Trạng thái
            </label>
            <Select
              name="status"
              value={campaign?.status}
              onChange={onStatusChange}
              className="w-full"
            >
              <Select.Option value="Active">Đang chạy</Select.Option>
              <Select.Option value="Paused">Chờ Phê Duyệt</Select.Option>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Riêng tư
            </label>
            <Select
              name="isPrivate"
              value={campaign?.isPrivate}
              onChange={(value) => {
                onChange({
                  target: {
                    name: 'isPrivate',
                    value: value
                  }
                });
              }}
              className="w-full"
            >
              <Select.Option value={true}>Có</Select.Option>
              <Select.Option value={false}>Không</Select.Option>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tỷ lệ chuyển đổi
            </label>
            <Input
              name="conversionRate"
              placeholder="Tỷ lệ chuyển đổi"
              type="number"
              value={campaign?.conversionRate}
              onChange={onChange}
              className="w-full rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mã tiền tệ
            </label>
            <Input
              name="currencyCode"
              placeholder="Mã tiền tệ"
              value={campaign?.currencyCode || "VND"}
              onChange={onChange}
              className="w-full rounded"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCampaignModal;