const mongoose = require('mongoose');
const checkList = require('../model/checkList.model.js');
const User = require('../model/user.model.js');

exports.createCheckList = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(422)
                .json({
                    error: "User not found",
                    message: "Please login and try again."
                });
        }

        const {
            task,
            endingDate,
            completed
        } = req.body;

        if (!task || !endingDate || !completed) {
            return res.status(422)
                .json({
                    error: "Details are missing",
                    Message: "Fill the required details and try again."
                });
        }

        const newCheckList = await checkList.create({
            task: task,
            endingDate: endingDate,
            completed: completed,
            user: user
        });

        return res.status(201).json({
            message: "CheckList created successfully.",
            data: newCheckList
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messsage: "Can not create checkList.",
            error: "Internal server error."
        });
    }
};

exports.getCheckList = async (req, res) => {
    try {
        const user = req.user.id;

        if (!user) {
            return res.status(422)
                .json({
                    error: "User not found",
                    message: "Please login and try again."
                });
        }

        const checkListData = await checkList.find({ user: user });

        if (checkListData.length === 0) {
            return res.status(404)
                .json({
                    error: "CheckList not found",
                    message: "Please create a checkList."
                });
        }

        return res.status(200)
            .json({
                message: "CheckList fetched successfully.",
                data: checkListData
            });
    } catch (error) {
        return res.status(500)
            .json({
                error: "Internal server error.",
                message: "Can not get checkList."
            });
    }
}

exports.updateCheckList = async (req, res) => {
    try {
        const user = req.user.id;

        if (!user) {
            return res.status(422)
                .json({
                    error: "User not found",
                    message: "Please login and try again."
                });
        }

        const {
            task,
            endingDate,
            completed
        } = req.body;

        if (!task || !endingDate || !completed) {
            return res.status(422)
                .json({
                    error: "Details are missing",
                    Message: "Fill the required details and try again."
                });
        }

        const checkListData = await checkList.findOneAndUpdate(
            { user: user },
            {
                task: task,
                endingDate: endingDate,
                completed: completed,
                user: user
            },
            {
                new: true
            }
        );

        return res.status(200)
            .json({
                message: "CheckList updated successfully.",
                data: checkListData
            });

    } catch (error) {
        return res.status(500)
            .json({
                error: "Internal server error.",
                message: "Can not update checkList."
            });
    }
}

exports.deleteCheckList = async (req, res) => {
    try {
        const user = req.user.id;

        if (!user) {
            return res.status(422)
                .json({
                    error: "User not found",
                    message: "Please login and try again."
                });
        }

        const checkListData = await checkList.findOneAndDelete({ user: user });

        if (!checkListData) {
            return res.status(404)
                .json({
                    error: "CheckList not found",
                    message: "Please create a checkList."
                });
        }

        return res.status(200)
            .json({
                message: "CheckList deleted successfully.",
                data: checkListData
            });
    } catch (error) {
        return res.status(500)
            .json({
                error: "Internal server error.",
                message: "Can not delete checkList."
            });
    }
}