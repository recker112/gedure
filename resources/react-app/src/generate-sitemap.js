require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./routers-sitemap").default;
const Sitemap = require("react-router-sitemap").default;

(
	new Sitemap(router)
			.build("https://lacandelaria.com.ve")
			.save("./public/sitemap.xml")
);