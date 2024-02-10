// roleChangeRequest.controllers.js

import RoleChangeRequest from "../models/roleChangeRequest.model.js";
import User from "../models/user.model.js";

// List all requests (only accessible by admin)
export const listRoleChangeRequests = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Only admins can view role change requests.' });
        }

        const requests = await RoleChangeRequest.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new role change request
export const createRoleChangeRequest = async (req, res) => {
    try {
        const { userId, userProfileImage, username, communityCapacity, reasonDescription } = req.body;

        // Check if the community capacity meets the minimum requirement (10)
        if (communityCapacity < 10) {
            return res.status(400).json({ message: "Community capacity must be at least 10." });
        }

        // Create a new role change request
        const newRequest = new RoleChangeRequest({
            userId,
            userProfileImage,
            username,
            communityCapacity,
            reasonDescription
        });

        // Save the request to the database
        const savedRequest = await newRequest.save();

        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// List all pending role change requests
export const listPendingRoleChangeRequests = async (req, res) => {
    try {

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Only admins can view role change requests.' });
        }


        const pendingRequests = await RoleChangeRequest.find({ status: 'pending' });
        res.json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a role change request (only accessible by admin)
export const approveRoleChangeRequest = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Only admins can approve role change requests.' });
        }

        const { requestId } = req.params;

        // Find the request by ID and update its status to 'approved'
        const updatedRequest = await RoleChangeRequest.findByIdAndUpdate(requestId, { status: 'approved' }, { new: true });

        // Update user's role if the request exists
        if (updatedRequest) {
            const user = await User.findById(updatedRequest.userId);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Update user's role
            user.role = updatedRequest.newRole;
            await user.save();

            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Role change request not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject a role change request (only accessible by admin)
export const rejectRoleChangeRequest = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Only admins can reject role change requests.' });
        }

        const { requestId } = req.params;

        // Find the request by ID and update its status to 'rejected'
        const updatedRequest = await RoleChangeRequest.findByIdAndUpdate(requestId, { status: 'rejected' }, { new: true });

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};