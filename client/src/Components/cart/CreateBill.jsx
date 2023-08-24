import { Button, Card, Form, Input, Modal, Select,message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../Redux/cartSlice";



const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  }

  return (
    <Modal
      title="Faktura Yarat"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
     
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müştəri Adı"
          name={"customerName"}
          rules={[
            {
              required: true,
              message: "Mustəri adi boş olmaz",
            },
          ]}
        >
          <Input placeholder="Bir Müştəri Adı Yazın" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"customerPhoneNumber"}
          label="Tel No"
        >
          <Input placeholder="Bir Tel No Yazın" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Bir Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nağd</Select.Option>
            <Select.Option value="Kredi Kartı">Kredit Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
          <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
          <b>Ümumi Toplam</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Yarat
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};
export default CreateBill