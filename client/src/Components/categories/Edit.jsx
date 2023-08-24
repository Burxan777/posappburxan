import { Button, Form, Input, Modal, Table, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, setIsEditModalOpen,categories,setCategories }) => {
const [editingRow,setEditingRow] = useState({})


const onFinish = (values) => {
  console.log(values);
  try {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
      method: "PUT",
      body: JSON.stringify({ ...values, categoryId: editingRow._id }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    message.success("Kategoriya  başarıyla güncəlləndi.");
    setCategories(
      categories.map((item) => {
        if (item._id === editingRow._id) {
          return { ...item, title: values.title };
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
  if (window.confirm("Emin misiniz?")) {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategoriya başarıyla silindi.");
      setCategories(categories.filter((item) => item._id !== id));
    } catch (error) {
      message.error("Bir şeyler səhv getdi.");
      console.log(error);
    }
  }
};


  const colums = [
    {
      title:"Categroy Title",
      dataIndex:"title",
      render: (_, record) => {
        if(record._id === editingRow._id ){
          return(
            <FormItem className="mb-0" name="title" >
              <Input defaultValue={record.title}/>
            </FormItem>
          );
        } else{
          return <p>{record.title}</p>
        }
      }
    },
    {
      title:"Action",
      dataIndex: "action",
      render:(_,record) =>{
        return(
          <div>
            <Button type="link" className="pl-0" onClick={() => setEditingRow(record)}>Duzəliş et</Button>
            <Button type="text" htmlType="submit"  >Yadda Saxla</Button>
            <Button type="link" danger   onClick={() => deleteCategory(record._id)}
            >Sil</Button>
          </div>
        )
      }
    }
  ];
  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table 
         bordered 
        dataSource={categories}
         columns={colums}
         rowKey={"_id"} />
      </Form>
    </Modal>
  );
};

export default Edit;