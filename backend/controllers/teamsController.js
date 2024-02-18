import { validationError } from '../helpers/errorsHandler.js';
import { teamsService, teamsModel } from '../models/teamsModel.js';

class TeamsController {

  async createTeam(req, res) {
    try {
      const team = { ...req.body, creator_id: req.user._id};
      
      const validationResult = await teamsModel.validateSchema(team);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const newTeam = await teamsService.add(team);
      res.status(201).json(newTeam);
    } catch (error) {
      res.status(400).json({ error: `Team creation failed: ${error.message}` });
    }
  }

  async getAllTeams(req, res) {
    try {
      // Get all teams from the database
      const allTeams = await teamsService.getAll({ users: { $in: [req.user._id] } });

      res.status(200).json(allTeams);
    } catch (error) {
      res.status(500).json({ error: 'Get all teams failed: Internal Server Error' });
    }
  }

  async getTeam(req, res) {
    try {
      const teamId = req.params.id;
      const team = await teamsService.get(teamId);

      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ error: 'Get team failed: Internal Server Error' });
    }
  }

  async updateTeam(req, res) {
    try {
      const teamId = req.params.id;
      
      const validationResult = await teamsModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const updateResult = await teamsService.update(teamId, req.body);

      if (!updateResult) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Update team failed: Internal Server Error' });
    }
  }

  async deleteTeam(req, res) {
    try {
      const teamId = req.params.id;
      const deleteResult = await teamsService.delete(teamId);

      if (!deleteResult) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete team failed: Internal Server Error' });
    }
  }

  async updateTeamStatus(req, res) {
    try {
      const teamId = req.params.id;

      // Validate the newStatus against your allowed status values
      // For example, you might have an array of allowed statuses
      const allowedStatuses = ['active', 'inactive', 'suspended'];
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      // Update the team status
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $set: { status: req.body.status } },
        { returnDocument: 'after' }, // Return the modified document
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json(updatedTeam);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 

  async requestTeam(req, res) {
    try {
      const teamId = req.params.id;

      // Add user to the team's requests array
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $addToSet: { requests: req.user._id } },
        { returnDocument: 'after' },
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Request sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async inviteTeam(req, res) {
    try {
      const teamId = req.params.id;
      const userId = req.body.userId;

      // Add user to the team's invites array
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $addToSet: { invites: userId } },
        { returnDocument: 'after' },
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async acceptJoinTeam(req, res) {
    try {
      const teamId = req.params.id;
      const userId = req.body.userId;

      // Remove user from the team's requests array and add them to users array
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $pull: { requests: userId }, $addToSet: { users: userId } },
        { returnDocument: 'after' },
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'User added to team successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async acceptRequestTeam(req, res) {
    try {
      const teamId = req.params.id;

      // Remove user from the team's invites array and add them to users array
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $pull: { invites: req.user._id }, $addToSet: { users: req.user._id } },
        { returnDocument: 'after' },
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Request accepted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async removeInvitationTeam(req, res) {
    try {
      const teamId = req.params.id;
      const userId = req.body.userId;

      // Remove user from the team's invites array
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $pull: { invites: userId } },
        { returnDocument: 'after' },
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Invitation removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeRequestTeam(req, res) {
    try {
      const teamId = req.params.id;

      // Remove user from the team's requests array
      const updatedTeam = await teamsService.findAndUpdate(
        { _id: teamId },
        { $pull: { requests: req.user._id } },
        { returnDocument: 'after' },
        {}
      );

      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json({ message: 'Request removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default TeamsController;
