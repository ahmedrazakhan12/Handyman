// controller function 


exports.login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByField("email", email);
        if (!user) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid email!'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid password!'
            });
        }
        if (activeSessions[user.id]) {
            delete activeSessions[user.id];
        }

        const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: user.full_name,
            email: user.email,
            bio: user.bio,
            profile_picture: user.profile_picture,
            cover_picture: user.cover_picture,
            role: user.role,
            is_admin: user.is_admin,
            is_active: user.is_active,
            registration_date: user.registration_date
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        activeSessions[user.id] = token;
        res.setHeader('Authorization', `${token}`)

        res.status(200).json({
            status: 200,
            message: 'Login successful.',
            user: payload,
            token: token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};



// model function 

exports.getUserByField = async (fieldName, fieldValue) => {
    try {
        const query = `SELECT * FROM users WHERE ${fieldName} = ?`;

        const [rows] = await pool.query(query, [fieldValue]);

        return rows[0];

    } catch (error) {
        throw error;
    }
};
