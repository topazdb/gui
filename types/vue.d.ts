
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare interface Window {
    __INITIAL_STATE__: any
}