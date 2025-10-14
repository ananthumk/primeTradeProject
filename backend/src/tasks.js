const express = require('express')

module.exports = function(db){ 
    const router = express.Router()

    router.post('/', async (req, res) => {
        try {
            const {title, description, status } = req.body 
            const query = 'INSERT INTO tasks ( user_id, title, description, status) VALUES ( ?, ?, ?, ?) '
            await db.run(query, [req.user.id, title, description, status])
            return res.status(201).json({message: 'Added task successfully!'})
        } catch (error) {
            console.log('While inserting tasks: ', error.message)
            return res.status(500).json({message: 'Something went wrong! Try again later'})
        }
    })

    router.get('/', async (req, res) => {
        try {
            const query = 'SELECT * FROM tasks WHERE user_id = ?'
            const tasks = await db.all(query, [req.user.id])
  
            return res.status(200).json({tasks})
        } catch (error) {
            console.log('While getting tasks: ', error.message)
            return res.status(500).json({message: 'Something went wrong! Try again later'})
        }
    })

  router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, status} = req.body;
        
        // Check if at least one field is provided
        if (!title && !description && !status) {
            return res.status(400).json({
                message: 'Please provide at least one field to update (title, description, or status)'
            });
        }
        
        // Build dynamic query based on provided fields
        const updates = [];
        const values = [];
        
        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        
        if (status !== undefined) {
            updates.push('status = ?');
            values.push(status);
        }
        
        // Add WHERE clause values
        values.push(id);
        values.push(req.user.id);
        
        // Construct the query
        const updateQuery = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`;
        
        const result = await db.run(updateQuery, values);
        
        // Check if any row was updated
        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Task not found or you do not have permission to update it'
            });
        }

        return res.status(200).json({
            message: 'Task updated successfully',
            updatedFields: {
                title: title !== undefined,
                description: description !== undefined,
                status: status !== undefined
            }
        });
        
    } catch (error) {
        console.log('While updating tasks: ', error.message);
        return res.status(500).json({message: 'Something went wrong! Try again later'});
    }
});

    router.delete('/:id', async (req, res) => {
        try {
            const {id} = req.params
            const taskQuery = 'SELECT * FROM tasks WHERE id = ?'
            const task = await db.get(taskQuery, [id])

            if(!task) return res.status(401).json({message: 'No task found'})

            const deleteQuery = 'DELETE FROM tasks WHERE id = ?'
            await db.run(deleteQuery, [id])

            return res.status(200).json({message: 'Task Deleted Successfully'})
        } catch (error) {
            console.log('While deleting tasks: ', error.message)
            return res.status(500).json({message: 'Something went wrong! Try again later'})
        }
    })
    
    return router
}