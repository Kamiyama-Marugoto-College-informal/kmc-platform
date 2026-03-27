type Role = "student" | "staff" | "admin";

const roleBorderColor: Record<Role, string> = {
  student: "#3b82f6", // blue
  staff: "#22c55e",   // green
  admin: "#f97316",   // orange
};

interface UserAvatarProps {
  name: string;
  image?: string | null;
  role: string;
}

export function UserAvatar({ name, image, role }: UserAvatarProps) {
  const borderColor = roleBorderColor[(role as Role) ?? "student"] ?? roleBorderColor.student;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: `3px solid ${borderColor}`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e7eb",
        flexShrink: 0,
      }}
    >
      {image ? (
        <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ fontWeight: 600, fontSize: 16, color: "#374151" }}>{initial}</span>
      )}
    </div>
  );
}
