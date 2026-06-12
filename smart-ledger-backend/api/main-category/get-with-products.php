<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

$company_id = isset($_GET['company_id']) ? intval($_GET['company_id']) : 0;
$main_category_id = isset($_GET['main_category_id']) ? intval($_GET['main_category_id']) : 0;

if (empty($company_id)) {
    echo json_encode(["status" => false, "message" => "Company ID is required"]);
    exit;
}

// If specific main category is requested
if ($main_category_id > 0) {
    $query = "
        SELECT 
            mc.id as main_category_id,
            mc.name as main_category_name,
            mc.description as main_category_description,
            c.id as sub_category_id,
            c.name as sub_category_name,
            p.id as product_id,
            p.product_name,
            p.product_code,
            p.price,
            p.wholesale_price,
            p.min_wholesale_qty,
            p.product_type,
            p.stock,
            p.barcode,
            p.gst_percentage,
            p.image,
            p.unit
        FROM main_categories mc
        INNER JOIN categories c ON c.main_category_id = mc.id AND c.is_deleted = 0 AND c.status = 'active'
        LEFT JOIN products p ON p.category_id = c.id AND p.is_deleted = 0 AND p.status = 'active'
        WHERE mc.company_id = $company_id 
        AND mc.id = $main_category_id
        AND mc.is_deleted = 0 
        AND mc.status = 'active'
        ORDER BY c.id ASC, p.id ASC
    ";
} else {
    // Get only main categories (lightweight)
    $query = "
        SELECT 
            mc.id,
            mc.name,
            mc.description,
            (SELECT COUNT(*) FROM categories c WHERE c.main_category_id = mc.id AND c.is_deleted = 0 AND c.status = 'active') as sub_category_count
        FROM main_categories mc
        WHERE mc.company_id = $company_id 
        AND mc.is_deleted = 0 
        AND mc.status = 'active'
        ORDER BY mc.id ASC
    ";
}

$result = mysqli_query($conn, $query);

if ($main_category_id > 0) {
    // Build hierarchical data for specific main category
    $mainCategory = null;
    $subCategories = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        if (!$mainCategory) {
            $mainCategory = [
                'id' => $row['main_category_id'],
                'name' => $row['main_category_name'],
                'description' => $row['main_category_description'],
                'sub_categories' => []
            ];
        }
        
        $subCatId = $row['sub_category_id'];
        if (!isset($subCategories[$subCatId])) {
            $subCategories[$subCatId] = [
                'id' => $row['sub_category_id'],
                'name' => $row['sub_category_name'],
                'products' => []
            ];
        }
        
        if ($row['product_id']) {
            $subCategories[$subCatId]['products'][] = [
                'id' => $row['product_id'],
                'product_name' => $row['product_name'],
                'product_code' => $row['product_code'],
                'price' => $row['price'],
                'wholesale_price' => $row['wholesale_price'],
                'min_wholesale_qty' => $row['min_wholesale_qty'],
                'product_type' => $row['product_type'],
                'stock' => $row['stock'],
                'barcode' => $row['barcode'],
                'gst_percentage' => $row['gst_percentage'],
                'image' => $row['image'],
                'unit' => $row['unit']
            ];
        }
    }
    
    if ($mainCategory) {
        $mainCategory['sub_categories'] = array_values($subCategories);
    }
    
    echo json_encode([
        "status" => true,
        "data" => $mainCategory
    ]);
} else {
    // Return only main categories list
    $mainCategories = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $mainCategories[] = $row;
    }
    
    echo json_encode([
        "status" => true,
        "data" => $mainCategories
    ]);
}
?>