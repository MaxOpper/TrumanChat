
const generateKey = () => {
    const key = Math.floor(100000 + Math.random() * 900000);
    return key.toString();
  };
  
  export default generateKey;
  