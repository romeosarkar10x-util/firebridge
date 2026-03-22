import { Badge } from "@/components/ui/badge";
import { getMinutesUntilExpiry } from "@/utils/jwt";

interface TokenMetaProps {
    email: string;
    idToken: string;
    serviceName: string;
}

function TokenMeta({ email, idToken, serviceName }: TokenMetaProps) {
    const minutesLeft = getMinutesUntilExpiry(idToken);
    const isExpired = minutesLeft < 0;
    const isExpiringSoon = minutesLeft >= 0 && minutesLeft < 5;

    const expiryLabel = isExpired
        ? "Expired"
        : minutesLeft === 1
          ? "Expires in 1 min"
          : `Expires in ${minutesLeft} min`;

    return (
        <div className="flex flex-wrap gap-1.5">
            {serviceName && <Badge variant="secondary">{serviceName}</Badge>}
            <Badge variant="outline">{email}</Badge>
            <Badge variant={isExpired || isExpiringSoon ? "destructive" : "outline"}>{expiryLabel}</Badge>
        </div>
    );
}

export { TokenMeta };
