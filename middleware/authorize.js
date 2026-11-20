export function authorizeModification(req, res, next) {
  const user = req.user;
  const isParent = user?.role === "parent";
  const isChildModifyingOwnList =
    user?.role === "child" && String(user.id) === String(req.params.userId);

  if (!isParent && !isChildModifyingOwnList) {
    return res.status(403).json({ error: "Access denied" });
  }

  return next();
}
