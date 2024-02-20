const now = Date.now();

export const saltRounds = 10; // Number of salt rounds for bcrypt hashing

export const maxColors = 256*256*256*100;
export const colorLimit = 100;

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
  alpha: (Math.floor(Math.random() * 101) / 100),
  user_id: undefined,
  status: false,
  create_date: now,
  update_date: now,
};
