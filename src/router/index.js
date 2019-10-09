import Home from 'page/home/home.jsx'
import Output from 'page/output/output.jsx'
import Lists from 'page/lists/lists.jsx'
import Detail from 'page/details/details.jsx'
import Call from 'page/call/call.jsx'

export default [
    {
        path: "/item/home",
        name: "home",
        component: Home
    },
    {
        path: "/item/output",
        name: "output",
        component: Output
    },
    {
        path: "/item/lists/:type",
        name: "lists",
        component: Lists
    },
    {
        path: "/item/detail",
        name: "detail",
        component: Detail
    },
    {
        path: "/item/call",
        name: "call",
        component: Call
    }
]