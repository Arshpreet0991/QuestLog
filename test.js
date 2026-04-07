// const today = new Date();
// today.setHours(0, 0, 0, 0);

// console.log("today: ", today.toISOString().split("T")[0]);

// const date = new Date();
// date.setHours(0, 0, 0, 0);
// date.setDate(date.getDate() + 1);

// const tommorow = date.toISOString().split("T")[0]; // get local date

// console.log("tommorrow", tommorow);

const today = new Date();
today.setHours(0, 0, 0, 0);
console.log(today.getTime());

const tommorow = new Date(today);
tommorow.setDate(tommorow.getDate() + 1);
console.log(tommorow.getTime());
