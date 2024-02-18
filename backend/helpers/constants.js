const now = Date.now();

export const randomColorLimit = 20;
export const saltRounds = 10; // Number of salt rounds for bcrypt hashing

export const userInitData = {
  pic: null,
  bio: null,
  config: {
    action: "onclick",
    mode: "ligth-mode",
    zoom: "0.5px",
  }, 
  status: "inactive",
  create_date: now,
  update_date: now,
  last_date: now,
  socket_id: null,
};

export const randomColor = {
  red: Math.floor(Math.random() * 256),
  green: Math.floor(Math.random() * 256),
  blue: Math.floor(Math.random() * 256),
  alpha: Math.random(),
  user_id: undefined,
  status: false,
  create_date: now,
  update_date: now,
};
