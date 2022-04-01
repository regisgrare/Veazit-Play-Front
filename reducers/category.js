export default function (category = [], action) {
    if (action.type == 'addchecked') {
        return action.category
    } else {
        return category
    };
}