import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  action: "create" | "update" | "delete" | "view" | "export" | "login" | "logout";
  resourceType: "password" | "card" | "note" | "account";
  details: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["create", "update", "delete", "view", "export", "login", "logout"],
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["password", "card", "note", "account"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

// İndeksler
ActivitySchema.index({ userId: 1, createdAt: -1 });
ActivitySchema.index({ action: 1 });
ActivitySchema.index({ resourceType: 1 });

export const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
