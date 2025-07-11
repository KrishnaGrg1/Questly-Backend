import { Response } from 'express';
import IRequest from '../middlewares/authMiddleware';
import client from '../helpers/prisma';
import findUser from '../helpers/findUser';
import { GoalCategory } from '../helpers/goal';

const submitGoal = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const userID = Number(req.userID);

    const existingUser = await findUser(Number(userID));
    if (!existingUser) {
      res.status(400).json({
        message: 'User not found',
      });
      return;
    }
    const exisitngGoal = await client.goal.findUnique({
      where: {
        userId: userID,
      },
    });
    if (exisitngGoal) {
      res.status(400).json({
        message: 'User has already goal',
      });
      return;
    }
    const { title, category, selfRating } = req.body;
    if (!Object.values(GoalCategory).includes(category)) {
      res.status(400).json({ message: 'Invalid category value' });
      return;
    }
    const newGoal = await client.goal.create({
      data: {
        userId: userID,
        title,
        category: category as GoalCategory,
        selfRating,
      },
    });
    res.status(200).json({
      newGoal,
      message: 'created goal',
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({
        message: e.message,
      });
    } else {
      res.status(500).json({
        messsage: 'Unexpected Error has occurred',
      });
    }
  }
};

const goalControllers = {
  submitGoal,
};

export default goalControllers;
