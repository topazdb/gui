import Vue, { CreateElement, VNode } from "vue";
import { DefaultProps as Props } from "vue/types/options";
import { Store } from "vuex";
import VueRouter, { Route } from "vue-router";

declare module "vue/types/vue" {
    export interface Vue {
        options: any;      
        $auth: any;
    }
    
    export interface Component {
        options: any;
        $auth: any;
    }

    export interface VueConstructor {
        options: any;
        store: Store<any>;
        router: VueRouter;
        render: any;
        auth: any;
    }
}

declare module "vue/types/options" {
   

    export interface ComponentOptions<V extends Vue> {
        options: any;
        $auth: any;
    }
}