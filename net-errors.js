// A list of Chrome OS Socket API error codes.

(function(exports) {
  var NetError = {
    IO_PENDING: -1,
    FAILED: -2,
    ABORTED: -3,
    INVALID_ARGUMENT: -4,
    INVALID_HANDLE: -5,
    FILE_NOT_FOUND: -6,
    TIMED_OUT: -7,
    FILE_TOO_BIG: -8,
    UNEXPECTED: -9,
    ACCESS_DENIED: -10,
    NOT_IMPLEMENTED: -11,
    INSUFFICIENT_RESOURCES: -12,
    OUT_OF_MEMORY: -13,
    UPLOAD_FILE_CHANGED: -14,
    SOCKET_NOT_CONNECTED: -15,
    FILE_EXISTS: -16,
    FILE_PATH_TOO_LONG: -17,
    FILE_NO_SPACE: -18,
    FILE_VIRUS_INFECTED: -19,
    BLOCKED_BY_CLIENT: -20,
    NETWORK_CHANGED: -21,
    BLOCKED_BY_ADMINISTRATOR: -22,
    SOCKET_IS_CONNECTED: -23,
    BLOCKED_ENROLLMENT_CHECK_PENDING: -24,
    UPLOAD_STREAM_REWIND_NOT_SUPPORTED: -25,
    CONTEXT_SHUT_DOWN: -26,
    BLOCKED_BY_RESPONSE: -27,
    CONNECTION_CLOSED: -100,
    CONNECTION_RESET: -101,
    CONNECTION_REFUSED: -102,
    CONNECTION_ABORTED: -103,
    CONNECTION_FAILED: -104,
    NAME_NOT_RESOLVED: -105,
    INTERNET_DISCONNECTED: -106,
    SSL_PROTOCOL_ERROR: -107,
    ADDRESS_INVALID: -108,
    ADDRESS_UNREACHABLE: -109,
    SSL_CLIENT_AUTH_CERT_NEEDED: -110,
    TUNNEL_CONNECTION_FAILED: -111,
    NO_SSL_VERSIONS_ENABLED: -112,
    SSL_VERSION_OR_CIPHER_MISMATCH: -113,
    SSL_RENEGOTIATION_REQUESTED: -114,
    PROXY_AUTH_UNSUPPORTED: -115,
    CERT_ERROR_IN_SSL_RENEGOTIATION: -116,
    BAD_SSL_CLIENT_AUTH_CERT: -117,
    CONNECTION_TIMED_OUT: -118,
    HOST_RESOLVER_QUEUE_TOO_LARGE: -119,
    SOCKS_CONNECTION_FAILED: -120,
    SOCKS_CONNECTION_HOST_UNREACHABLE: -121,
    ALPN_NEGOTIATION_FAILED: -122,
    SSL_NO_RENEGOTIATION: -123,
    WINSOCK_UNEXPECTED_WRITTEN_BYTES: -124,
    SSL_DECOMPRESSION_FAILURE_ALERT: -125,
    SSL_BAD_RECORD_MAC_ALERT: -126,
    PROXY_AUTH_REQUESTED: -127,
    SSL_WEAK_SERVER_EPHEMERAL_DH_KEY: -129,
    PROXY_CONNECTION_FAILED: -130,
    MANDATORY_PROXY_CONFIGURATION_FAILED: -131,
    PRECONNECT_MAX_SOCKET_LIMIT: -133,
    SSL_CLIENT_AUTH_PRIVATE_KEY_ACCESS_DENIED: -134,
    SSL_CLIENT_AUTH_CERT_NO_PRIVATE_KEY: -135,
    PROXY_CERTIFICATE_INVALID: -136,
    NAME_RESOLUTION_FAILED: -137,
    NETWORK_ACCESS_DENIED: -138,
    TEMPORARILY_THROTTLED: -139,
    HTTPS_PROXY_TUNNEL_RESPONSE: -140,
    SSL_CLIENT_AUTH_SIGNATURE_FAILED: -141,
    MSG_TOO_BIG: -142,
    SPDY_SESSION_ALREADY_EXISTS: -143,
    WS_PROTOCOL_ERROR: -145,
    ADDRESS_IN_USE: -147,
    SSL_HANDSHAKE_NOT_COMPLETED: -148,
    SSL_BAD_PEER_PUBLIC_KEY: -149,
    SSL_PINNED_KEY_NOT_IN_CERT_CHAIN: -150,
    CLIENT_AUTH_CERT_TYPE_UNSUPPORTED: -151,
    ORIGIN_BOUND_CERT_GENERATION_TYPE_MISMATCH: -152,
    SSL_DECRYPT_ERROR_ALERT: -153,
    WS_THROTTLE_QUEUE_TOO_LARGE: -154,
    SSL_SERVER_CERT_CHANGED: -156,
    CT_NO_SCTS_VERIFIED_OK: -158,
    SSL_UNRECOGNIZED_NAME_ALERT: -159,
    SOCKET_SET_RECEIVE_BUFFER_SIZE_ERROR: -160,
    SOCKET_SET_SEND_BUFFER_SIZE_ERROR: -161,
    SOCKET_RECEIVE_BUFFER_SIZE_UNCHANGEABLE: -162,
    SOCKET_SEND_BUFFER_SIZE_UNCHANGEABLE: -163,
    SSL_CLIENT_AUTH_CERT_BAD_FORMAT: -164,
    ICANN_NAME_COLLISION: -166,
    SSL_SERVER_CERT_BAD_FORMAT: -167,
    CT_STH_PARSING_FAILED: -168,
    CT_STH_INCOMPLETE: -169,
    UNABLE_TO_REUSE_CONNECTION_FOR_PROXY_AUTH: -170,
    CT_CONSISTENCY_PROOF_PARSING_FAILED: -171,
    SSL_OBSOLETE_CIPHER: -172,
    CERT_COMMON_NAME_INVALID: -200,
    CERT_DATE_INVALID: -201,
    CERT_AUTHORITY_INVALID: -202,
    CERT_CONTAINS_ERRORS: -203,
    CERT_NO_REVOCATION_MECHANISM: -204,
    CERT_UNABLE_TO_CHECK_REVOCATION: -205,
    CERT_REVOKED: -206,
    CERT_INVALID: -207,
    CERT_WEAK_SIGNATURE_ALGORITHM: -208,
    CERT_NON_UNIQUE_NAME: -210,
    CERT_WEAK_KEY: -211,
    CERT_NAME_CONSTRAINT_VIOLATION: -212,
    CERT_VALIDITY_TOO_LONG: -213,
    CERTIFICATE_TRANSPARENCY_REQUIRED: -214,
    CERT_END: -215,
    INVALID_URL: -300,
    DISALLOWED_URL_SCHEME: -301,
    UNKNOWN_URL_SCHEME: -302,
    TOO_MANY_REDIRECTS: -310,
    UNSAFE_REDIRECT: -311,
    UNSAFE_PORT: -312,
    INVALID_RESPONSE: -320,
    INVALID_CHUNKED_ENCODING: -321,
    METHOD_NOT_SUPPORTED: -322,
    UNEXPECTED_PROXY_AUTH: -323,
    EMPTY_RESPONSE: -324,
    RESPONSE_HEADERS_TOO_BIG: -325,
    PAC_STATUS_NOT_OK: -326,
    PAC_SCRIPT_FAILED: -327,
    REQUEST_RANGE_NOT_SATISFIABLE: -328,
    MALFORMED_IDENTITY: -329,
    CONTENT_DECODING_FAILED: -330,
    NETWORK_IO_SUSPENDED: -331,
    SYN_REPLY_NOT_RECEIVED: -332,
    ENCODING_CONVERSION_FAILED: -333,
    UNRECOGNIZED_FTP_DIRECTORY_LISTING_FORMAT: -334,
    INVALID_SPDY_STREAM: -335,
    NO_SUPPORTED_PROXIES: -336,
    SPDY_PROTOCOL_ERROR: -337,
    INVALID_AUTH_CREDENTIALS: -338,
    UNSUPPORTED_AUTH_SCHEME: -339,
    ENCODING_DETECTION_FAILED: -340,
    MISSING_AUTH_CREDENTIALS: -341,
    UNEXPECTED_SECURITY_LIBRARY_STATUS: -342,
    MISCONFIGURED_AUTH_ENVIRONMENT: -343,
    UNDOCUMENTED_SECURITY_LIBRARY_STATUS: -344,
    RESPONSE_BODY_TOO_BIG_TO_DRAIN: -345,
    RESPONSE_HEADERS_MULTIPLE_CONTENT_LENGTH: -346,
    INCOMPLETE_SPDY_HEADERS: -347,
    PAC_NOT_IN_DHCP: -348,
    RESPONSE_HEADERS_MULTIPLE_CONTENT_DISPOSITION: -349,
    RESPONSE_HEADERS_MULTIPLE_LOCATION: -350,
    SPDY_SERVER_REFUSED_STREAM: -351,
    SPDY_PING_FAILED: -352,
    CONTENT_LENGTH_MISMATCH: -354,
    INCOMPLETE_CHUNKED_ENCODING: -355,
    QUIC_PROTOCOL_ERROR: -356,
    RESPONSE_HEADERS_TRUNCATED: -357,
    QUIC_HANDSHAKE_FAILED: -358,
    SPDY_INADEQUATE_TRANSPORT_SECURITY: -360,
    SPDY_FLOW_CONTROL_ERROR: -361,
    SPDY_FRAME_SIZE_ERROR: -362,
    SPDY_COMPRESSION_ERROR: -363,
    PROXY_AUTH_REQUESTED_WITH_NO_CONNECTION: -364,
    HTTP_1_1_REQUIRED: -365,
    PROXY_HTTP_1_1_REQUIRED: -366,
    PAC_SCRIPT_TERMINATED: -367,
    INVALID_HTTP_RESPONSE: -370,
    CACHE_MISS: -400,
    CACHE_READ_FAILURE: -401,
    CACHE_WRITE_FAILURE: -402,
    CACHE_OPERATION_NOT_SUPPORTED: -403,
    CACHE_OPEN_FAILURE: -404,
    CACHE_CREATE_FAILURE: -405,
    CACHE_RACE: -406,
    CACHE_CHECKSUM_READ_FAILURE: -407,
    CACHE_CHECKSUM_MISMATCH: -408,
    CACHE_LOCK_TIMEOUT: -409,
    CACHE_AUTH_FAILURE_AFTER_READ: -410,
    INSECURE_RESPONSE: -501,
    NO_PRIVATE_KEY_FOR_CERT: -502,
    ADD_USER_CERT_FAILED: -503,
    FTP_FAILED: -601,
    FTP_SERVICE_UNAVAILABLE: -602,
    FTP_TRANSFER_ABORTED: -603,
    FTP_FILE_BUSY: -604,
    FTP_SYNTAX_ERROR: -605,
    FTP_COMMAND_NOT_SUPPORTED: -606,
    FTP_BAD_COMMAND_SEQUENCE: -607,
    PKCS12_IMPORT_BAD_PASSWORD: -701,
    PKCS12_IMPORT_FAILED: -702,
    IMPORT_CA_CERT_NOT_CA: -703,
    IMPORT_CERT_ALREADY_EXISTS: -704,
    IMPORT_CA_CERT_FAILED: -705,
    IMPORT_SERVER_CERT_FAILED: -706,
    PKCS12_IMPORT_INVALID_MAC: -707,
    PKCS12_IMPORT_INVALID_FILE: -708,
    PKCS12_IMPORT_UNSUPPORTED: -709,
    KEY_GENERATION_FAILED: -710,
    PRIVATE_KEY_EXPORT_FAILED: -712,
    SELF_SIGNED_CERT_GENERATION_FAILED: -713,
    CERT_DATABASE_CHANGED: -714,
    DNS_MALFORMED_RESPONSE: -800,
    DNS_SERVER_REQUIRES_TCP: -801,
    DNS_SERVER_FAILED: -802,
    DNS_TIMED_OUT: -803,
    DNS_CACHE_MISS: -804,
    DNS_SEARCH_EMPTY: -805,
    DNS_SORT_ERROR: -806};

  var NetErrorCode = {};
  for (var name in NetError)
    if (NetError.hasOwnProperty(name))
      NetErrorCode[NetError[name]] = name;

  exports.NetError = NetError;
  exports.NetErrorCode = NetErrorCode;
})(window);