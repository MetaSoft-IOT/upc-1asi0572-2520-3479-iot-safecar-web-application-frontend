import {createRouter, createWebHistory} from "vue-router";
import SignInComponent from "@/safecar/security/pages/sign-in.component.vue";
import SignUpComponent from "@/safecar/security/pages/sign-up.component.vue";
import LayoutSafeCarComponent from "@/public/pages/layout-safe-car.component.vue";
import servicesRequestManagementComponent
    from "@/safecar/service-requests/pages/services-request-management.component.vue";
import serviceHistoryManagementComponent
    from "@/safecar/service-history/pages/service-history-management.component.vue";



const router = createRouter({
    history: createWebHistory(),
    routes: [


        {path: '/:pathMatch(.*)*', redirect: '/safecar/sign-in'},


        {
            path: '/safecar/sign-in',
            name: 'sign-in',
            component: SignInComponent,
            meta: { title: 'Login'}
        },


        {
            path: '/safecar/sign-up',
            name: 'sign-up',
            component: SignUpComponent,
            meta: { title: 'Registro de Taller'}
        },


        {
            path: '/safe-car', name: 'safe-car', component: LayoutSafeCarComponent, meta: {title: 'SafeCar'},
            children: [
                {
                    path: 'mechanic/service-request',
                    name: 'mechanic-service-request',
                    component: servicesRequestManagementComponent,
                    meta: { title: 'Solicitudes de Servicio' }
                },
                {
                    path: 'mechanic/service-history',
                    name: 'mechanic-service-history',
                    component: serviceHistoryManagementComponent,
                    meta: { title: 'Historial de Servicio' }
                }
            ]
        }






        //




        //{path: '/page-not-found',           name: 'PageNotFound',             component: PageNotFoundComponent,' +'            meta: { title: 'Page Not Found' }},


        /*

        {path: '/:pathMatch(.*)*', redirect: '/elixir-line/login'},

        {path: '/page-not-found',           name: 'PageNotFound',             component: PageNotFoundComponent,            meta: { title: 'Page Not Found' }},

        {path: '/elixir-line/login' ,       name: 'Login', component: SignInComponent, meta: { title: 'Login'}},


        //ruta para la página de inicio home-elixir line
        {
            path: '/elixir-line/:id/home', name: 'ElixirLineHome', component: LayoutElixirLineComponent,
            children:[
                {path: '/vinicultor/winemaking',      name: 'WinemakingProcess', component: TabsWinemakingViewComponent,     meta: { title: 'Winemaking'}},
                {path:'/vinicultor/supplies', name: 'SuppliesManagement', component: SupplyManagement, meta: { title: 'Supplies'}},
                {path: '/vinicultor/profile/settings', name: 'ProfileSettings', component: ProfileViewsConfigurationComponent, meta: { title: 'Profile Settings'}},

                { path: '/vinicultor/tasks', name: 'Tasks', component: TaskManagement, meta: { title: 'Tasks' } } ,
                { path: '/vinicultor/Calendar', name: 'Calendar', component: CalendarManagement, meta: { title: 'Calendar' } },

                {path: '/vinicultor/evidence', name: 'EvidenceManagement', component: tabsEvidenceViewComponent, meta: { title: 'EvidenceManagement'}},



            ], meta: { title: 'Wine Batches' },

        },
         */


    ]
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'SafeCar';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})


export default router;