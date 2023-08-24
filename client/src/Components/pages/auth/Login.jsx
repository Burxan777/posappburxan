import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../auth/AuthCarousel";
import { useState } from "react";

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const onFinish = async (values) =>{
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email:user.email,
          })
        )
        message.success("Giriş  başarılı.");
        navigate("/");
        setLoading(false);
      }
      else if(res.status === 404){
        message.error("kullanici tapilmadi")
      }
      else if(res.status === 403){
        message.error("şifrə dogru deyil!")
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir şeylər səhv getdi.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish} initialValues={{remember:false,}}>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Sahəsi Boş  olmaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Sahəsi Boş Olmaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Hələdə bir hesabınız yok du?&nbsp;
            <Link to="/register" className="text-blue-600">
              İndi Qeyydiyatdan keç
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Bütun cihazlarin ölçüləri ilə uyumluluk"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Müşteri Memnuniyeti"
                  desc="Dənəmə sonrası məhsuldan məmnun qalan müştəri"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;