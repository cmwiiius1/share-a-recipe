module.exports = (app) => {
	console.log("--------inside of index-------");
	require ("./apiRoutes")(app);
};