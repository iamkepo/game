let today = Date.now();
const randomColorLimit = 20;
const userInitData = {
  pic: "",
  bio: "",
  config: {
    action: "onclick",
    mode: "ligth-mode",
    zoom: "0.5px",
  }, 
  status: "inactive",
  create_date: today,
  update_date: today,
  last_date: today,
  socket_id: undefined,
};

const randomColor = {
  red: Math.floor(Math.random() * 256),
  green: Math.floor(Math.random() * 256),
  blue: Math.floor(Math.random() * 256),
  alpha: Math.random(),
  user_id: undefined,
  status: false,
  create_date: today,
  update_date: today,
};
module.exports = {
  randomColor,
  userInitData,
  randomColorLimit
};