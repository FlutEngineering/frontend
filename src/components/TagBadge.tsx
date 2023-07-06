import { Badge, BadgeProps } from "@chakra-ui/react";

interface TagBadgeProps {
  tag: string;
}

const TagBadge: React.FC<TagBadgeProps & BadgeProps> = ({ tag, ...props }) => (
  <Badge
    variant="subtle"
    colorScheme="purple"
    cursor="pointer"
    opacity={0.7}
    _notFirst={{ marginLeft: "1" }}
    _hover={{ opacity: 0.9 }}
    {...props}
  >
    {tag}
  </Badge>
);

export default TagBadge;
