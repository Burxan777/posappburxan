import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";

const Edit = () =>{
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  

  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);


  const onFinish = (values) => {
  
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Məhsul başarıyla güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeylər səhv getdi.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Əminsən?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ _id: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Məhsul başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Məhsul Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Məhsul rəsmi",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Məhsul Qiyməti",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategoriya",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button
             type="link"
              className="pl-0"
              onClick={()=>{
                setIsEditModalOpen(true);
                setEditingItem(record)
              }}
              >
              Düzəliş et
            </Button>
       
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
   <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />

<Modal
        title="Yeni Məhsul Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Məhsul Adı"
            rules={[
              { required: true, message: "Məhsul Adı Sahəsi Boş Olmaz!" },
            ]}
          >
            <Input placeholder="Məhsul adı giriniz." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Məhsul Görseli"
            rules={[
              { required: true, message: "Məhsul rəsmi Sahəsi Boş Olmaz!" },
            ]}
          >
            <Input placeholder="Məhsul rəsmi giriniz." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Məhsul Qiyməti"
            rules={[
              { required: true, message: "Məhsul Qiyməti Sahəsi Boş Olmaz!" },
            ]}
          >
            <Input placeholder="Məhsul Qiyməti giriniz." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Kategori Sahəsi Boş Olmaz!" },
            ]}
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
              Yenilə
            </Button>
          </Form.Item>
        </Form>
      </Modal>
   </>
  );
};

export default Edit;