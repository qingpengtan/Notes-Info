/**
 * 二分搜索树
 * @param <E>
 */
public class BST<E extends Comparable<E>>{

    private class Node{
        public E e;
        public Node left,right;

        public Node(E e){
            this.e = e;
            left = null;
            right = null;
        }
    }

    private Node root;
    private int size;

    public BST(){
        root = null;
        size = 0;
    }

    public int size(){
        return size;
    }

    public boolean isEmpty(){
        return size == 0;
    }

    public void add(E e){

        if(root == null){
            root = new Node(e);
            size++;
        }else {
            add(root,e)
        }
    }

    private void add(Node node,E e){

        if (e.equals(node.e))
            return;
        else if(e.compareTo(node.e) < 0 && node.length == null) {
            node.left = new Node(e);
            size++;
            return;
        }  else if(e.compareTo(node.e) > 0 && node.length == null) {
            node.right = new Node(e);
            size++;
            return;
        }
        if (e.compareTo(node.e) < 0)
            add(node.left,e);
        else
            add(node.right,e);

    }


    private Node addTo(Node node,E e){

        if(node == null){
            size++;
            return new Node(e);
        }
        if (e.compareTo(node.e) < 0)
            node.left = add(node.left,e);
        else
            node.right = add(node.right,e);
        return node;
    }

    public boolean contains(E e){
        return contains(root,e);
    }

    private boolean contains(Node node,E e) {

        if (node == null)
            return false;
        else if(e.compareTo(node.e) < 0)
            return contains(node.left,e);
        else if(e.compareTo(node.e) > 0)
            return contains(node.right,e);
        else
            return true;
    }

    //二分搜索树的前序遍历
    public void preOrder(){
        preOrder(root);
    }

    private void preOrder(Node node){

        if (node != null){
            System.out.println(node.e);
            preOrder(node.left);
            preOrder(node.right);
        }

    }

//    二分搜索树的中序遍历
    public void inOrder(){
        inOrder(root);
    }

    private void inOrder(Node node){

        if (node != null) {
            inOrder(node.left);
            System.out.println(node.e);
            inOrder(node.right);
        }
    }

//    二分搜索树的层序遍历
    private void levelorder(){

        Queue<Node> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()){
            Node cur = q.remove();
            System.out.println(cur.e);
            if (cur.left != null)
                q.add(cur.left);
            if (cur.right != null)
                q.add(cur.right);

        }
    }


}