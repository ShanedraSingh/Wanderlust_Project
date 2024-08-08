// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");
// const data = require("./data.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj)=>({
//     ...obj,
//     owner: "668d53d4e9dc3867000ff94d"
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();



if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const DB_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
	.then(() => {
		console.log("connected to DB");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(DB_URL);
}

let categoryAll = [
	"Beachfront",
	"Cabins",
	"Omg",
	"Lake",
	"Design",
	"Amazing Pools",
	"Farms",
	"Amazing Views",
	"Rooms",
	"Lakefront",
	"Tiny Homes",
	"Countryside",
	"Treehouse",
	"Trending",
	"Tropical",
	"National Parks",
	"Casties",
	"Camping",
	"Top Of The World",
	"Luxe",
	"Iconic Cities",
	"Earth Homes",
];

const initDB = async () => {
	await Listing.deleteMany({});
	initData.data = initData.data.map((obj) => ({
		...obj,
		owner: "66b3c3e017f7b2b8af95c726",
		price: obj.price * 25,
		category: [
			`${categoryAll[Math.floor(Math.random() * 22)]}`,
			`${categoryAll[Math.floor(Math.random() * 22)]}`,
		],
	}));
	await Listing.insertMany(initData.data);
	console.log("data was initialized");
};
initDB();


