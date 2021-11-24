export default ({app, route}) => {
    if (route.fullPath.indexOf('/' + app.i18n.locale + '/') !== 0) return;

    let redirects = app.$auth.$storage.options.redirect;
    for (let key in redirects) {
        redirects[key] = '/' + app.i18n.locale + redirects[key]
    }
    app.$auth.$storage.options.redirect = redirects
}
