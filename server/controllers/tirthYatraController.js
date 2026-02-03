const TirthYatra = require('../models/TirthYatra');

// @desc    Get all Tirth Yatras
// @route   GET /api/tirthyatra
// @access  Public
exports.getTirthYatras = async (req, res) => {
    try {
        const tirthYatras = await TirthYatra.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(tirthYatras);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single Tirth Yatra
// @route   GET /api/tirthyatra/:id
// @access  Public
exports.getTirthYatraById = async (req, res) => {
    try {
        const tirthYatra = await TirthYatra.findById(req.params.id);
        if (!tirthYatra) {
            return res.status(404).json({ msg: 'Tirth Yatra not found' });
        }
        res.json(tirthYatra);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tirth Yatra not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new Tirth Yatra
// @route   POST /api/tirthyatra
// @access  Private/Admin
exports.createTirthYatra = async (req, res) => {
    try {
        console.log('Create TirthYatra Payload:', JSON.stringify(req.body, null, 2)); // Debug logging

        const {
            title,
            icon,
            date,
            startDate,
            endDate,
            duration,
            travelMode,
            locations,
            eligibility,
            description,
            ticketPrice,
            whatsappLink,
            trainInfo, // JSON stringified from frontend
            itinerary,
            packages,
            instructions,
            includes,
            excludes
        } = req.body;

        let image = req.body.image;
        if (req.file) {
            image = req.file.path; // Cloudinary URL
        } else if (!image && req.body.image === '') {
            // Handle case where image might be cleared, though usually required
        }

        // Helper to safely parse JSON and sanitize numeric fields recursively
        const parseAndSanitize = (dataStr, fieldName) => {
            if (!dataStr) return [];
            try {
                let data = typeof dataStr === 'string' ? JSON.parse(dataStr) : dataStr;

                // Recursive sanitization function
                const sanitize = (obj) => {
                    if (Array.isArray(obj)) {
                        return obj.map(sanitize);
                    } else if (typeof obj === 'object' && obj !== null) {
                        for (let key in obj) {
                            if (obj[key] === '' && (key === 'price' || key === 'cost' || key === 'perPerson')) {
                                obj[key] = 0; // Convert empty numeric strings to 0
                            } else {
                                obj[key] = sanitize(obj[key]);
                            }
                        }
                    }
                    return obj;
                };

                return sanitize(data);
            } catch (e) {
                console.error(`Error parsing ${fieldName}:`, e);
                return [];
            }
        };

        const parsedTrainInfo = parseAndSanitize(trainInfo, 'trainInfo');
        const parsedItinerary = parseAndSanitize(itinerary, 'itinerary');
        const parsedPackages = parseAndSanitize(packages, 'packages');
        const parsedInstructions = parseAndSanitize(instructions, 'instructions');

        const newTirthYatra = new TirthYatra({
            title,
            icon,
            image,
            date,
            startDate,
            endDate,
            duration,
            travelMode,
            locations,
            eligibility,
            description,
            ticketPrice,
            whatsappLink,
            trainInfo: parsedTrainInfo,
            itinerary: parsedItinerary,
            packages: parsedPackages,
            instructions: parsedInstructions,
            includes: parseAndSanitize(includes, 'includes'),
            excludes: parseAndSanitize(excludes, 'excludes')
        });

        const tirthYatra = await newTirthYatra.save();
        res.json(tirthYatra);
    } catch (err) {
        console.error('Error creating Tirth Yatra:', err); // Enhanced error logging
        res.status(500).send('Server Error: ' + err.message);
    }
};

// @desc    Update a Tirth Yatra
// @route   PUT /api/tirthyatra/:id
// @access  Private/Admin
exports.updateTirthYatra = async (req, res) => {
    try {
        console.log(`[Update] Request for ID: ${req.params.id}`);
        console.log('[Update] req.file:', req.file ? req.file.path : 'No file uploaded');
        // console.log('[Update] req.body keys:', Object.keys(req.body)); // Log keys to see what's arriving

        let tirthYatra = await TirthYatra.findById(req.params.id);
        if (!tirthYatra) {
            return res.status(404).json({ msg: 'Tirth Yatra not found' });
        }

        let updateData = { ...req.body };

        // If file is uploaded, use its path.
        if (req.file) {
            console.log('[Update] Updating image with new file path:', req.file.path);
            updateData.image = req.file.path;
        } else {
            // Strictly sanitize image field
            // If it's not a string, or if it looks like an empty object string "{}" (just in case)
            if (typeof req.body.image !== 'string' || req.body.image === '{}') {
                // console.log('Sanitizing invalid image body (removing from updateData)');
                delete updateData.image;
            } else if (req.body.image === undefined || req.body.image === null) {
                delete updateData.image;
            }
        }

        // Helper to safely parse JSON and sanitize numeric fields recursively
        const parseAndSanitize = (dataStr, fieldName) => {
            if (!dataStr) return undefined; // Return undefined to avoid overwriting with empty array if not provided
            try {
                let data = typeof dataStr === 'string' ? JSON.parse(dataStr) : dataStr;

                const sanitize = (obj) => {
                    if (Array.isArray(obj)) {
                        return obj.map(sanitize);
                    } else if (typeof obj === 'object' && obj !== null) {
                        for (let key in obj) {
                            if (obj[key] === '' && (key === 'price' || key === 'cost' || key === 'perPerson')) {
                                obj[key] = 0;
                            } else {
                                obj[key] = sanitize(obj[key]);
                            }
                        }
                    }
                    return obj;
                };

                return sanitize(data);
            } catch (e) {
                console.error(`Error parsing ${fieldName}:`, e);
                return undefined;
            }
        };

        const fieldsToParse = ['trainInfo', 'itinerary', 'packages', 'instructions', 'includes', 'excludes'];
        fieldsToParse.forEach(field => {
            if (req.body[field]) {
                const parsed = parseAndSanitize(req.body[field], field);
                if (parsed !== undefined) {
                    updateData[field] = parsed;
                }
            }
        });

        tirthYatra = await TirthYatra.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        console.log('[Update] Success');
        res.json(tirthYatra);
    } catch (err) {
        console.error('Error updating Tirth Yatra (STACK):', err.stack); // Print full stack trace
        res.status(500).send('Server Error: ' + err.message);
    }
};

// @desc    Delete a Tirth Yatra
// @route   DELETE /api/tirthyatra/:id
// @access  Private/Admin
exports.deleteTirthYatra = async (req, res) => {
    try {
        const tirthYatra = await TirthYatra.findById(req.params.id);
        if (!tirthYatra) {
            return res.status(404).json({ msg: 'Tirth Yatra not found' });
        }

        await TirthYatra.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Tirth Yatra removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tirth Yatra not found' });
        }
        res.status(500).send('Server Error');
    }
};
