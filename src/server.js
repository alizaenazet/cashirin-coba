const Hapi = require('@hapi/hapi');
const merchantRoutes = require('./routers/merchantRouter');
const userRoutes = require('./routers/userRouter');
const adminRoutes = require('./routers/adminRouter');
const ownerRoutes = require('./routers/ownerRouter');
const orderRoutes = require('./routers/orderRouter');
const productRoutes = require('./routers/productRouter');
const categoryRoutes = require('./routers/categoryRouter');
const transactionRoutes  = require('./routers/transactionRouter');
const refreshTokenRoute  = require('./routers/refreshToken');
const {refreshTokenScheme,allRoleScheme,ownerUserScheme, merchantScheme,userScheme,ownerAdminScheme,ownerScheme} = require('./utils/strategyOptionJwt');
const Jwt = require('@hapi/jwt');



 (async () => {
    const server = Hapi.server({
        port: 8080,
        host: "0.0.0.0",
      });

    await server.register(Jwt);
    server.auth.scheme('customeMerchantSchema', merchantScheme);
    server.auth.scheme('customeUsertSchema', userScheme);
    server.auth.scheme('customeOwnerSchema', ownerScheme);
    server.auth.scheme('customeOwnerUserScheme', ownerUserScheme);
    server.auth.scheme('customeRefreshTokenSchema', refreshTokenScheme);
    server.auth.scheme('customeOwnerAdminScheme', ownerAdminScheme);
    server.auth.scheme('customeAllRoleScheme', allRoleScheme);
    server.auth.strategy('merchantAuth','customeMerchantSchema')
    server.auth.strategy('refreshAuth','customeRefreshTokenSchema')
    server.auth.strategy('userAuth','customeUsertSchema')
    server.auth.strategy('ownerAuth','customeOwnerSchema')
    server.auth.strategy("owner-user-auth","customeOwnerUserScheme")
    server.auth.strategy("owner-admin-auth","customeOwnerAdminScheme")
    server.auth.strategy("allRole","customeAllRoleScheme")
    server.route(merchantRoutes)
    server.route(userRoutes)
    server.route(adminRoutes)
    server.route(ownerRoutes)
    server.route(orderRoutes)
    server.route(productRoutes)
    server.route(categoryRoutes)
    server.route(transactionRoutes)
    server.route(refreshTokenRoute)
    // server.auth.default('jwt');
    try {
        await server.start()
        console.log(`server version ${server.version}`);
        console.log(`server perjalan pada ${server.info.uri}`);
    } catch (error) {
        return error
    }
})();


