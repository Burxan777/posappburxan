import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategoriya başarıyla əlavə edildi.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Məhsul əlavə et"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Məhsul Adı"
          rules={[{ required: true, message: "Məhsul Adı Sahəsi Boş Olmaz!" }]}
        >
          <Input placeholder="Məhsul adı gir." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Məhsul rəsmi"
          rules={[
            { required: true, message: "Məhsul Rəsmi Sahəsi Boş Olmaz!" },
          ]}
        >
          <Input placeholder="Məhsul rəsmi gir." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Məhsul qiyməti"
          rules={[
            { required: true, message: "Məhsul Qiymət Sahəsi Boş Olmaz!" },
          ]}
        >
          <Input placeholder="Məhsul qiyməti gir." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori Seç"
          rules={[{ required: true, message: "Kategori Sahəsi Boş Olmaz!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Yarat
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;