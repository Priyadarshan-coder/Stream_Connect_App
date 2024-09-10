import { errorHandler } from "../utils/error.js";
import prisma from '../DB/db.config.js';


export const update = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); // Ensure userId is an integer
    const currentUserId = req.user.id;

    if (userId === currentUserId) {
      // Update the user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: req.body, // Update fields with the request body
      });

      res.status(200).json(updatedUser);
    } else {
      // User is not allowed to update this account
      return next(createError(403, "You can update only your account!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); // Ensure userId is an integer
    const currentUserId = req.user.id;

    if (userId === currentUserId) {
      // Delete the user
      await prisma.user.delete({
        where: { id: userId },
      });

      res.status(200).json("User has been deleted.");
    } else {
      // User is not allowed to delete this account
      return next(createError(403, "You can delete only your account!"));
    }
  } catch (err) {
    next(err);
  }};

export const getUser = async (req, res, next) => {
  try {
    const userId = parseInt(parseInt(req.params.id,10)); // Ensure userId is an integer

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const subscribe = async (req, res, next) => {
  const currentUserId = req.user.id;
  const targetUserId = req.params.id; // Convert targetUserId to string

  try {
    // Find current user and target user
    const currentUser = await prisma.user.findUnique({
      where: { id: parseInt(currentUserId,10) },
    });

    const targetUser = await prisma.user.findUnique({
      where: { id: parseInt(targetUserId,10) },
    });

    // Check if both users exist
    if (!currentUser || !targetUser) {
      return next(createError(404, "User not found!"));
    }

    // Update the current user's subscribedUsers array by adding targetUserId as a string
    await prisma.user.update({
      where: { id: parseInt(currentUserId,10) },
      data: {
        subscribedUsers: {
          set: [...currentUser.subscribedUsers, targetUserId], // Ensure target user is added as a string
        },
      },
    });

    // Increment the subscriber count of the target user
    await prisma.user.update({
      where: { id: parseInt(targetUserId,10) },
      data: {
        subscribers: {
          increment: 1, // Increment subscriber count by 1
        },
      },
    });

    // Return success message
    res.status(200).json("Subscription successful.");
  } catch (err) {
    console.log(err);
    next(err); // Pass error to error handler middleware
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = parseInt(req.params.id); // Ensure targetUserId is an integer

    // Fetch the current user from the database to get the subscribedUsers array
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return next(createError(404, "Current user not found!"));
    }

    // Remove the targetUserId from the current user's subscribedUsers array
    const updatedSubscribedUsers = currentUser.subscribedUsers.filter(
      (id) => id !== targetUserId.toString()
    );
    console.log(updatedSubscribedUsers);

    // Update the current user's subscribedUsers array
    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        subscribedUsers: {
          set: updatedSubscribedUsers, // Update subscribedUsers array
        },
      },
    });

    // Decrement the subscribers count of the target user
    await prisma.user.update({
      where: { id: targetUserId },
      data: {
        subscribers: {
          decrement: 1, // Decrease the subscribers count by 1
        },
      },
    });

    res.status(200).json("Unsubscription successful.");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const userId = req.user.id.toString();
  const videoId = parseInt(req.params.videoId, 10); // Ensure videoId is an integer

  try {
    // Fetch the current state of the video
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return next(createError(404, "Video not found!"));
    }

    // Check if user has already liked the video
    if (video.likes.includes(userId)) {
      return res.status(200).json("User has already liked the video.");
    }

    // Update the video to add userId to likes and remove from dislikes
    await prisma.video.update({
      where: { id: videoId },
      data: {
        likes: {
          set: [...video.likes, userId], // Add userId to likes array
        },
        dislikes: {
          set: video.dislikes.filter(id => id !== userId), // Remove userId from dislikes array
        },
      },
    });

    res.status(200).json("The video has been liked.");
  } catch (err) {
    console.log(err);
    next(err); // Pass the error to the error-handling middleware
  }
};

export const dislike = async (req, res, next) => {
  const userId = req.user.id.toString();
  const videoId = parseInt(req.params.videoId, 10); // Ensure videoId is an integer

  try {
    // Fetch the current state of the video
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return next(createError(404, "Video not found!"));
    }

    // Check if user has already disliked the video
    if (video.dislikes.includes(userId)) {
      return res.status(200).json("User has already disliked the video.");
    }

    // Update the video to add the user ID to dislikes and remove from likes
    await prisma.video.update({
      where: { id: videoId },
      data: {
        dislikes: {
          set: [...video.dislikes, userId], // Add userId to dislikes array
        },
        likes: {
          set: video.likes.filter(id => id !== userId), // Remove userId from likes array
        },
      },
    });

    res.status(200).json("The video has been disliked.");
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to error-handling middleware
  }
};
