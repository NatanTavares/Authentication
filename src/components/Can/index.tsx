import { useCan } from "../../hooks/useCan";

type Props = {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
};

export function Can({ children, permissions, roles }: Props) {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
