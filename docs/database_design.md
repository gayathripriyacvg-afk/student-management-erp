# 🗄️ Database Design

We use **MongoDB** with **Mongoose** to model our data.

## 👤 Student Schema
```js
{
  name: String,       // Required
  email: String,      // Required, Unique
  age: Number,
  course: String,     // Name of the course
  enrolledAt: Date    // Default: Date.now
}
```

## 📖 Course Schema
```js
{
  courseName: String, // Required
  duration: String,   // e.g., "3 Months"
  instructor: String
}
```

## 📊 Marks Schema
```js
{
  studentId: ObjectId, // Reference to Student collection
  subject: String,
  marks: Number        // Score out of 100
}
```

## 🔗 Relationships
- The `Marks` collection is linked to the `Student` collection via the `studentId` field. This allows us to fetch performance data specifically for any given student.
