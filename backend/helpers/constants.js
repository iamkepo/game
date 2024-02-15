export const randomColorLimit = 20;
export const userInitData = {
  pic: "",
  bio: "",
  config: {
    action: "onclick",
    mode: "ligth-mode",
    zoom: "0.5px",
  }, 
  status: "inactive",
  create_date: Date.now(),
  update_date: Date.now(),
  last_date: Date.now(),
  socket_id: undefined,
};

export const randomColor = {
  red: Math.floor(Math.random() * 256),
  green: Math.floor(Math.random() * 256),
  blue: Math.floor(Math.random() * 256),
  alpha: Math.random(),
  user_id: undefined,
  status: false,
  create_date: Date.now(),
  update_date: Date.now(),
};
