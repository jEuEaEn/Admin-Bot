import axios from "axios";

export const sendWhatsappMessage = async (phone, message) => {
  try {
    const { data } = await axios.post(
      `https://graph.facebook.com/v25.0/${process.env.PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: "hello_world",
          language:{
            code: "en_US",
          }
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};