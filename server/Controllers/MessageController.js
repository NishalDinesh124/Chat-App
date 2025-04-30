const Messages = require('../Models/messageModel');


module.exports.addMsg = async (req, res, next) => {
    try {

        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: {text:message},
            users: [from, to],
            sender: from
        })
        if (data) { return res.json({ msg: "Message successfully added" }) }
        return res.json({ msg: "Failed to add message to database" });
    } catch (err) {
        next(err)
    }
}
module.exports.getMsg = async (req, res, next) => {
    try {
        const { from, to } =await req.body;     
        const messages = await Messages.find({
            users: {
                $all: [from, to]
            },
        }).sort({ updatedAt: 1 })
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectedMessages)
    } catch (err) {
        next(err)
    }
}